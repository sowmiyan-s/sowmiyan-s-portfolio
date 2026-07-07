import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/** Per-word mask reveal — Framer-template style. */
const RevealText = ({ text, className, delay = 0, as = 'span' }: Props) => {
  const Tag = motion[as];
  const words = text.split(' ');
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '110%' },
              visible: { y: '0%', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;
