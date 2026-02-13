import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import i18n from '../i18n/index.js'
import ChatWidget from './ChatWidget'

// Mock env variables
vi.stubEnv('VITE_ENABLE_CHAT', 'true')

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }) => children,
    motion: {
      div: ({ children, ...props }) => {
        const filteredProps = Object.fromEntries(
          Object.entries(props).filter(
            ([key]) =>
              !['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap'].includes(key),
          ),
        )
        return <div {...filteredProps}>{children}</div>
      },
      span: ({ children, ...props }) => {
        const filteredProps = Object.fromEntries(
          Object.entries(props).filter(
            ([key]) =>
              !['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap'].includes(key),
          ),
        )
        return <span {...filteredProps}>{children}</span>
      },
      button: ({ children, ...props }) => {
        const filteredProps = Object.fromEntries(
          Object.entries(props).filter(
            ([key]) =>
              !['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap'].includes(key),
          ),
        )
        return <button {...filteredProps}>{children}</button>
      },
    },
  }
})

beforeEach(async () => {
  localStorage.clear()
  // Ensure consistent language for tests
  await i18n.changeLanguage('ru')
})

describe('ChatWidget', () => {
  it('renders the floating chat button', () => {
    render(<ChatWidget />)
    const btn = screen.getByRole('button', { name: /открыть чат/i })
    expect(btn).toBeInTheDocument()
  })

  it('opens chat window on button click', async () => {
    render(<ChatWidget />)
    const openBtn = screen.getByRole('button', { name: /открыть чат/i })
    fireEvent.click(openBtn)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/YouPub AI/i)
    })
  })

  it('shows greeting message when chat opens', async () => {
    render(<ChatWidget />)
    fireEvent.click(screen.getByRole('button', { name: /открыть чат/i }))

    await waitFor(() => {
      expect(screen.getByText(/AI-ассистент YouPub/i)).toBeInTheDocument()
    })
  })

  it('closes chat window on close button click', async () => {
    render(<ChatWidget />)
    fireEvent.click(screen.getByRole('button', { name: /открыть чат/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/YouPub AI/i)
    })

    const closeBtn = screen.getByRole('button', { name: /закрыть чат/i })
    fireEvent.click(closeBtn)

    await waitFor(() => {
      expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
    })
  })

  it('returns null when VITE_ENABLE_CHAT is not true', () => {
    vi.stubEnv('VITE_ENABLE_CHAT', 'false')
    const { container } = render(<ChatWidget />)
    expect(container.innerHTML).toBe('')
    vi.stubEnv('VITE_ENABLE_CHAT', 'true')
  })
})
