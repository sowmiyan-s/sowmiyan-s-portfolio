import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, BookOpen, FileText, ArrowUpRight, X, ExternalLink, Download } from 'lucide-react';
import { certificatesList, Certificate } from '@/lib/certificates';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';

export const HonorsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section className="w-full py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={sectionReveal}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b-2 border-zinc-900"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-red-600 border border-zinc-900 shadow-brutal-sm inline-block" />
            <span className="font-mono text-xs text-red-600 font-bold uppercase tracking-widest">
              ACCREDITATION // SECTION 07
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
            HONORS &amp; MILESTONES
          </h2>
          <p className="font-mono text-xs sm:text-sm text-zinc-500 uppercase tracking-wider mt-2">
            Patents · Research Publications · Technical Certifications
          </p>
        </div>

        <Link
          to="/achievements"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-stone-100 text-zinc-900 border-2 border-zinc-900 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 font-mono text-xs font-bold uppercase tracking-wider transition-all"
        >
          <span>All Records ({certificatesList.length})</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>

      {/* Editorial Accolade Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
      >
        {/* Milestone 1: Patent */}
        <motion.div
          variants={sectionReveal}
          className="bg-white border-2 border-zinc-900 shadow-brutal p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-zinc-900">
              <span className="px-2 py-0.5 bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                PATENT GRANTED / FILED
              </span>
              <Award className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-heading font-black text-xl text-zinc-900 uppercase tracking-tight leading-snug mb-2">
              Automated Defect Detection System
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
              Industrial computer vision and edge IoT telemetry protocol for real-time manufacturing defect classification.
            </p>
          </div>
          <span className="mt-6 font-mono text-xs font-bold text-red-600 uppercase tracking-wider block">
            App No. 202441088457 A • 2025
          </span>
        </motion.div>

        {/* Milestone 2: Research Paper */}
        <motion.div
          variants={sectionReveal}
          className="bg-white border-2 border-zinc-900 shadow-brutal p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-zinc-900">
              <span className="px-2 py-0.5 bg-zinc-900 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                PEER-REVIEWED RESEARCH
              </span>
              <FileText className="w-5 h-5 text-zinc-900" />
            </div>
            <h3 className="font-heading font-black text-xl text-zinc-900 uppercase tracking-tight leading-snug mb-2">
              IJCRT Journal Publication
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
              Published empirical study on deep learning CNN architectures for automated pneumonia identification in chest radiographs.
            </p>
          </div>
          <span className="mt-6 font-mono text-xs font-bold text-zinc-900 uppercase tracking-wider block">
            IJCRT Vol 12, Issue 5 • 2024
          </span>
        </motion.div>

        {/* Milestone 3: Published Book */}
        <motion.div
          variants={sectionReveal}
          className="bg-white border-2 border-zinc-900 shadow-brutal p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-zinc-900">
              <span className="px-2 py-0.5 bg-zinc-900 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                TECHNICAL HANDBOOK
              </span>
              <BookOpen className="w-5 h-5 text-zinc-900" />
            </div>
            <h3 className="font-heading font-black text-xl text-zinc-900 uppercase tracking-tight leading-snug mb-2">
              Author: Python for Beginners
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
              Practical handbook covering foundational algorithmic patterns, standard library mastery, and production syntax.
            </p>
          </div>
          <span className="mt-6 font-mono text-xs font-bold text-zinc-900 uppercase tracking-wider block">
            Independent Release • 2024
          </span>
        </motion.div>
      </motion.div>

      {/* Certificate Strip */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-700">
            Select Verified Credentials (Click to Inspect)
          </span>
          <span className="font-mono text-[11px] text-zinc-400">
            Showing 6 of {certificatesList.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {certificatesList.slice(0, 6).map((cert, index) => (
            <button
              key={index}
              onClick={() => setSelectedCert(cert)}
              className="bg-white border-2 border-zinc-900 shadow-brutal-sm hover:shadow-brutal hover:translate-x-[-1px] hover:translate-y-[-1px] p-2 transition-all flex flex-col text-left group"
            >
              <div className="w-full aspect-[4/3] border border-zinc-900 overflow-hidden bg-stone-100 mb-2">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="font-mono text-[10px] text-red-600 font-bold uppercase tracking-wider truncate block">
                {cert.issuer}
              </span>
              <span className="font-heading font-bold text-xs text-zinc-900 uppercase line-clamp-1">
                {cert.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Neo-brutal Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white border-3 border-zinc-900 shadow-brutal p-6 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-zinc-900">
                <div>
                  <span className="px-2 py-0.5 bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-zinc-900 uppercase tracking-tight mt-1">
                    {selectedCert.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 border-2 border-zinc-900 bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-zinc-900 shadow-brutal-sm"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image Frame */}
              <div className="w-full border-2 border-zinc-900 overflow-hidden mb-5 bg-stone-100">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="w-full h-auto object-contain max-h-[50vh]"
                />
              </div>

              {/* Footer Meta & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-zinc-900">
                <span className="font-mono text-xs text-zinc-500 uppercase">
                  Issued: {selectedCert.date}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedCert.image}
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-zinc-900 border-2 border-zinc-900 shadow-brutal-sm font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  {selectedCert.link && (
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-600 text-white border-2 border-zinc-900 shadow-brutal-sm font-mono text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HonorsSection;
