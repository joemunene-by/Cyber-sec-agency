import { motion } from 'framer-motion'

const labsArticles = [
  {
    id: 1,
    title: 'Zero-Day Discovery: Critical RCE in Enterprise SSO',
    type: 'Research',
    date: '2024-01-15',
    excerpt: 'Our red team discovered a critical remote code execution vulnerability in a widely-used enterprise SSO solution affecting millions of organizations.',
    tags: ['Zero-Day', 'RCE', 'SSO']
  },
  {
    id: 2,
    title: 'AI Model Adversarial Attacks: A Comprehensive Analysis',
    type: 'Research',
    date: '2024-01-10',
    excerpt: 'Deep dive into adversarial attack vectors against LLM-based systems and defensive strategies for production deployments.',
    tags: ['AI Security', 'Adversarial ML', 'LLM']
  },
  {
    id: 3,
    title: 'Q4 2023 Global Threat Intelligence Report',
    type: 'Report',
    date: '2024-01-05',
    excerpt: 'Analysis of emerging threat actor TTPs, ransomware trends, and geopolitical cyber operations from Q4 2023.',
    tags: ['Threat Intel', 'CTI', 'Ransomware']
  },
  {
    id: 4,
    title: 'Open-Source Tool: Aegis Threat Hunter',
    type: 'Tool',
    date: '2023-12-20',
    excerpt: 'Released our internal threat hunting framework for public use. Includes MITRE ATT&CK mapping and automated IOC correlation.',
    tags: ['Open Source', 'Threat Hunting', 'MITRE ATT&CK']
  }
]

const Labs = () => {
  const scrollToContact = (e) => {
    if (e) {
      e.stopPropagation()
    }
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="labs" className="py-24 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">
            Labs & <span className="text-gradient">Research</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Cutting-edge security research, threat intelligence, and open-source tools 
            from our security operations and research teams.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {labsArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={scrollToContact}
              className="glass-card p-6 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyber-red uppercase tracking-wider">
                  {article.type}
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <h3 className="text-xl font-heading font-bold uppercase mb-3 group-hover:text-cyber-red transition-colors">
                {article.title}
              </h3>

              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-dark-red/20 text-dark-red rounded border border-dark-red/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ x: 5 }}
                className="mt-4 text-sm font-medium text-cyber-red flex items-center space-x-2"
              >
                <span>Read More</span>
                <span>→</span>
              </motion.button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Labs

