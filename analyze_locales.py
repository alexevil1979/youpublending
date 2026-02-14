import json
import os
from collections import defaultdict
from typing import Dict, Any, Set, List, Tuple

def get_all_keys(obj: Any, prefix: str = "") -> Set[str]:
    """Recursively get all keys in the JSON structure."""
    keys = set()
    if isinstance(obj, dict):
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            keys.add(full_key)
            if isinstance(value, (dict, list)):
                keys.update(get_all_keys(value, full_key))
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            if isinstance(item, (dict, list)):
                keys.update(get_all_keys(item, prefix))
    return keys

def get_leaf_keys(obj: Any, prefix: str = "") -> Set[str]:
    """Get only leaf keys (keys with string/array values, not nested objects)."""
    keys = set()
    if isinstance(obj, dict):
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                # Recursively get leaf keys from nested dict
                keys.update(get_leaf_keys(value, full_key))
            elif isinstance(value, list):
                # Array is a leaf key
                keys.add(full_key)
            else:
                # String or other primitive is a leaf key
                keys.add(full_key)
    elif isinstance(obj, list):
        for item in obj:
            if isinstance(item, (dict, list)):
                keys.update(get_leaf_keys(item, prefix))
    return keys

def get_array_lengths(obj: Any, prefix: str = "") -> Dict[str, int]:
    """Get lengths of all arrays in the structure."""
    lengths = {}
    if isinstance(obj, dict):
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, list):
                lengths[full_key] = len(value)
            elif isinstance(value, dict):
                lengths.update(get_array_lengths(value, full_key))
    elif isinstance(obj, list):
        for item in obj:
            if isinstance(item, (dict, list)):
                lengths.update(get_array_lengths(item, prefix))
    return lengths

def load_locale_file(filepath: str) -> Dict[str, Any]:
    """Load and parse a locale JSON file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def main():
    locale_dir = r"c:\Users\1\Documents\youpublanding\src\i18n\locales"
    files = {
        "ru": "ru.json",
        "en": "en.json",
        "zh": "zh.json",
        "hi": "hi.json",
        "de": "de.json",
        "fr": "fr.json",
        "nl": "nl.json"
    }
    
    # Load all files
    data = {}
    for lang, filename in files.items():
        filepath = os.path.join(locale_dir, filename)
        try:
            data[lang] = load_locale_file(filepath)
            print(f"[OK] Loaded {filename}")
        except Exception as e:
            print(f"[ERROR] Error loading {filename}: {e}")
            return
    
    print("\n" + "="*80)
    print("ANALYSIS REPORT")
    print("="*80)
    
    # 1. Count leaf keys for each file
    print("\n1. LEAF KEY COUNTS:")
    print("-" * 80)
    leaf_key_counts = {}
    for lang in files.keys():
        leaf_keys = get_leaf_keys(data[lang])
        count = len(leaf_keys)
        leaf_key_counts[lang] = count
        print(f"  {lang.upper()}: {count} leaf keys")
    
    # 2. Get all keys from ru.json (reference)
    ru_all_keys = get_all_keys(data["ru"])
    ru_leaf_keys = get_leaf_keys(data["ru"])
    
    print("\n2. MISSING KEYS (compared to ru.json):")
    print("-" * 80)
    missing_found = False
    for lang in files.keys():
        if lang == "ru":
            continue
        lang_all_keys = get_all_keys(data[lang])
        missing = ru_all_keys - lang_all_keys
        if missing:
            missing_found = True
            print(f"\n  {lang.upper()} is missing {len(missing)} key(s):")
            for key in sorted(missing):
                print(f"    - {key}")
    
    if not missing_found:
        print("  [OK] No missing keys found in any file")
    
    # 3. Check for extra keys not in ru.json
    print("\n3. EXTRA KEYS (not in ru.json):")
    print("-" * 80)
    extra_found = False
    for lang in files.keys():
        if lang == "ru":
            continue
        lang_all_keys = get_all_keys(data[lang])
        extra = lang_all_keys - ru_all_keys
        if extra:
            extra_found = True
            print(f"\n  {lang.upper()} has {len(extra)} extra key(s):")
            for key in sorted(extra):
                print(f"    - {key}")
    
    if not extra_found:
        print("  [OK] No extra keys found in any file")
    
    # 4. Check array lengths
    print("\n4. ARRAY LENGTH COMPARISON:")
    print("-" * 80)
    ru_array_lengths = get_array_lengths(data["ru"])
    array_mismatches = []
    
    for lang in files.keys():
        if lang == "ru":
            continue
        lang_array_lengths = get_array_lengths(data[lang])
        
        # Check arrays that exist in ru.json
        for key, ru_length in ru_array_lengths.items():
            if key not in lang_array_lengths:
                array_mismatches.append((lang, key, ru_length, None, "MISSING"))
            elif lang_array_lengths[key] != ru_length:
                array_mismatches.append((lang, key, ru_length, lang_array_lengths[key], "LENGTH_MISMATCH"))
        
        # Check for extra arrays
        for key, lang_length in lang_array_lengths.items():
            if key not in ru_array_lengths:
                array_mismatches.append((lang, key, None, lang_length, "EXTRA"))
    
    if array_mismatches:
        print("\n  Array length discrepancies found:")
        for lang, key, ru_len, lang_len, issue_type in array_mismatches:
            if issue_type == "MISSING":
                print(f"    {lang.upper()}: {key} - MISSING (should be {ru_len} items)")
            elif issue_type == "EXTRA":
                print(f"    {lang.upper()}: {key} - EXTRA ({lang_len} items)")
            else:
                print(f"    {lang.upper()}: {key} - {ru_len} items (ru) vs {lang_len} items ({lang})")
    else:
        print("  [OK] All arrays have matching lengths")
    
    # Summary
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    
    all_same_count = len(set(leaf_key_counts.values())) == 1
    if all_same_count:
        print(f"[OK] All files have the same number of leaf keys: {leaf_key_counts['ru']}")
    else:
        print("[ERROR] Leaf key counts differ:")
        for lang, count in leaf_key_counts.items():
            print(f"  {lang.upper()}: {count}")
    
    if not missing_found and not extra_found and not array_mismatches:
        print("[OK] All files have identical key structure!")
    else:
        print("[ERROR] Structural discrepancies found (see details above)")

if __name__ == "__main__":
    main()
