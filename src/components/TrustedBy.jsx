import { motion } from 'framer-motion'
import { Users, Building2, Video, Globe } from 'lucide-react'

const stats = [
  { icon: Users, value: '1 200+', label: 'Авторов и блогеров' },
  { icon: Building2, value: '50+', label: 'Агентств и студий' },
  { icon: Video, value: '250K+', label: 'Видео опубликовано' },
  { icon: Globe, value: '5', label: 'Платформ поддержки' },
]

export default function TrustedBy() {
  return (
    <section className="relative py-16 lg:py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 uppercase tracking-widest mb-10"
        >
          Уже доверяют YouPub
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/10 mb-4 group-hover:bg-violet-500/20 transition-colors">
                <stat.icon className="w-6 h-6 text-violet-400" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
