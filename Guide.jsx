"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Network,
  Layers,
  Repeat,
  ListTree,
  Sigma,
  Grid3X3,
  BookOpen,
  Trees,
  ScanLine,
  Wand2,
  Filter,
  Search
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Tiny inline SVG illustration as a React component (for the header)
const MeshBG: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 600 400"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <defs>
      <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="50%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#34d399" />
      </linearGradient>
      <filter id="blur">
        <feGaussianBlur stdDeviation="30" />
      </filter>
    </defs>
    <g filter="url(#blur)">
      <circle cx="120" cy="110" r="90" fill="url(#grad)" opacity="0.7" />
      <circle cx="520" cy="90" r="120" fill="url(#grad)" opacity="0.5" />
      <circle cx="300" cy="320" r="140" fill="url(#grad)" opacity="0.6" />
    </g>
  </svg>
);

const models = [
  {
    key: "ann",
    name: "Artificial Neural Networks (ANN)",
    icon: Brain,
    accent: "from-cyan-400 to-emerald-400",
    bestFor:
      "Large datasets with complex, non-linear relationships; images, audio, time series",
    datasets: ["MNIST", "CIFAR-10", "Tabular (non-linear)"],
    useCases: ["Image/speech recognition", "Forecasting"],
  },
  {
    key: "resnet",
    name: "ResNet",
    icon: Layers,
    accent: "from-violet-400 to-indigo-400",
    bestFor: "Very deep image models; avoids vanishing gradients",
    datasets: ["ImageNet", "CIFAR-100", "Medical imaging"],
    useCases: ["Image classification", "Object detection"],
  },
  {
    key: "densenet",
    name: "DenseNet",
    icon: Network,
    accent: "from-fuchsia-400 to-purple-400",
    bestFor: "Image tasks where feature reuse matters",
    datasets: ["CIFAR-10", "ImageNet", "X-Ray"],
    useCases: ["Medical imaging", "Fine-grained recognition"],
  },
  {
    key: "transfer",
    name: "Transfer Learning",
    icon: Repeat,
    accent: "from-rose-400 to-orange-400",
    bestFor: "Small/medium labeled datasets; leverage pre-trained backbones",
    datasets: ["Domain-specific images", "Small text corpora"],
    useCases: ["Specialized vision", "NLP fine-tuning"],
  },
  {
    key: "knn",
    name: "K-Nearest Neighbors (KNN)",
    icon: ListTree,
    accent: "from-emerald-400 to-teal-400",
    bestFor: "Small, low-dimensional datasets; instance-based",
    datasets: ["Iris", "Wine", "Small tabular"],
    useCases: ["Pattern recognition", "Recommenders (toy)"],
  },
  {
    key: "logreg",
    name: "Logistic Regression",
    icon: Sigma,
    accent: "from-sky-400 to-cyan-400",
    bestFor: "Binary/one-vs-rest classification; linearly separable or with simple interactions",
    datasets: ["Titanic", "Credit scoring", "Clinical"],
    useCases: ["Spam/fraud detection", "Risk scoring"],
  },
  {
    key: "mlp",
    name: "MLPClassifier",
    icon: Grid3X3,
    accent: "from-amber-400 to-rose-400",
    bestFor: "Structured tabular data with moderate complexity",
    datasets: ["MNIST (flattened)", "General tabular"],
    useCases: ["Classification in finance/retail/health"],
  },
  {
    key: "nb",
    name: "Naive Bayes (Gaussian / Multinomial / Bernoulli)",
    icon: BookOpen,
    accent: "from-lime-400 to-emerald-400",
    bestFor: "Text & probabilistic features; strong independence assumption",
    datasets: ["SMS Spam", "News groups", "Binary features"],
    useCases: ["Spam filtering", "Sentiment & topic labeling"],
  },
  {
    key: "rf",
    name: "Random Forest",
    icon: Trees,
    accent: "from-green-400 to-cyan-400",
    bestFor: "Mixed-type tabular, robust to noise & outliers",
    datasets: ["UCI tabular", "Loan prediction", "Churn"],
    useCases: ["Fraud/churn", "General tabular modeling"],
  },
  {
    key: "svm",
    name: "Support Vector Machine (SVM)",
    icon: ScanLine,
    accent: "from-indigo-400 to-sky-400",
    bestFor: "Medium-sized, high-dimensional data; kernels for non-linear",
    datasets: ["Breast cancer", "Digits", "Text"],
    useCases: ["Face/text classification", "Bioinformatics"],
  },
];

const cleaning = [
  {
    title: "De-noise & Fix Errors",
    text: "Correct typos, impossible values, and inconsistent labels to improve signal-to-noise.",
  },
  {
    title: "Handle Missingness",
    text: "Impute, drop, or flag missing data to avoid biased training and leakage.",
  },
  {
    title: "Standardize & Encode",
    text: "Scale numeric features; encode categoricals for algorithms that require numbers.",
  },
  {
    title: "Detect Outliers",
    text: "Identify anomalies that can skew models; cap, transform, or treat separately.",
  },
  {
    title: "Benefits",
    text: "Higher accuracy, faster training, less overfitting, and clearer interpretability.",
  },
];

export default function ModelsAnimatedGuide() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return models;
    return models.filter((m) =>
      [m.name, m.bestFor, ...m.datasets, ...m.useCases]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <MeshBG className="absolute inset-0 w-full h-full" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-6xl px-6 pt-16 pb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 shadow">
            <Wand2 className="h-4 w-4" />
            <span className="text-xs font-medium">Animated visual guide</span>
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Which Model Fits Which Dataset?
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">
            A quick, visual cheat‑sheet for ANN, ResNet, DenseNet, Transfer Learning, KNN, Logistic
            Regression, MLPClassifier, Naive Bayes, Random Forest, and SVM — plus why data cleaning
            matters.
          </p>

          {/* Search */}
          <div className="mt-6 flex items-center gap-2 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, datasets, use cases..."
                className="pl-9 h-11 rounded-2xl border-slate-200 shadow-sm"
              />
            </div>
            <Button variant="secondary" className="rounded-2xl shadow">
              <Filter className="h-4 w-4 mr-2" />
              Quick Filter
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Models Grid */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.02 * idx }}
              >
                <Card className="group rounded-3xl border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`relative h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br ${m.accent} p-[2px]` }>
                        <div className="h-full w-full rounded-2xl bg-white flex items-center justify-center">
                          <Icon className="h-6 w-6" />
                        </div>
                        {/* animated glow */}
                        <motion.span
                          className="absolute inset-0 rounded-2xl"
                          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.6), transparent)" }}
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 3.2, repeat: Infinity }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold tracking-tight">{m.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{m.bestFor}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.datasets.map((d) => (
                            <Badge key={d} variant="secondary" className="rounded-full">
                              {d}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {m.useCases.map((u) => (
                            <span
                              key={u}
                              className="text-xs rounded-full bg-slate-100 px-2 py-1 text-slate-700"
                            >
                              {u}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Accent ribbon */}
                    <motion.div
                      aria-hidden
                      className={`mt-5 h-1 rounded-full bg-gradient-to-r ${m.accent}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Data Cleaning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="relative rounded-3xl p-6 md:p-10 bg-white border border-slate-200 shadow-sm">
            <motion.div
              className="absolute -top-8 right-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400"
              animate={{ rotate: [0, 15, -10, 0], y: [0, -6, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
              <Wand2 className="h-6 w-6" /> Data Cleaning — Use & Advantages
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Clean data supercharges every model: better accuracy, faster training, less
              overfitting, and clearer insights.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {cleaning.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.04 * i }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </span>
                    <div>
                      <h3 className="font-medium">{c.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{c.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <div className="mt-10 text-center text-xs text-slate-500">
          Tip: For very small, imbalanced datasets, prefer classical models (LogReg/SVM/NB) or
          transfer learning over training deep nets from scratch.
        </div>
      </div>
    </div>
  );
}
