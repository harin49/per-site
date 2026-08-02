'use client';

import React, { useState } from 'react';
import { Compass, BookOpen, Terminal, Shield, Zap } from 'lucide-react';

const TRAITS = [
  {
    key: 'curiosity',
    label: 'Curiosity',
    Icon: Compass,
    sentence: 'Curiosity pulls me toward the unfamiliar, so I never stop picking up new tools and ideas.',
    mutedVar: '--dna-curiosity-muted',
    activeVar: '--dna-curiosity-active',
  },
  {
    key: 'learning',
    label: 'Learning',
    Icon: BookOpen,
    sentence: 'That curiosity turns into deliberate learning — reading, building, and revisiting until it clicks.',
    mutedVar: '--dna-learning-muted',
    activeVar: '--dna-learning-active',
  },
  {
    key: 'problem-solving',
    label: 'Problem Solving',
    Icon: Terminal,
    sentence: 'What I learn becomes leverage for breaking down hard problems into solvable pieces.',
    mutedVar: '--dna-problem-solving-muted',
    activeVar: '--dna-problem-solving-active',
  },
  {
    key: 'ownership',
    label: 'Ownership',
    Icon: Shield,
    sentence: 'I stay with a problem until it is actually solved, not just until it looks solved.',
    mutedVar: '--dna-ownership-muted',
    activeVar: '--dna-ownership-active',
  },
  {
    key: 'delivery',
    label: 'Delivery',
    Icon: Zap,
    sentence: 'All of it is in service of shipping software people can actually rely on.',
    mutedVar: '--dna-delivery-muted',
    activeVar: '--dna-delivery-active',
  },
] as const;

const DnaPipeline = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const activeIndex = TRAITS.findIndex((trait) => trait.key === activeKey);
  const activeTrait = activeIndex >= 0 ? TRAITS[activeIndex] : null;

  const handleClick = (key: string) => {
    setActiveKey((current) => (current === key ? null : key));
  };

  const sentenceStyle = activeTrait
    ? ({ '--dna-active': `var(${activeTrait.activeVar})` } as React.CSSProperties)
    : undefined;

  return (
    <div className="dna">
      <div className="dna__row">
        {TRAITS.map(({ key, label, Icon, mutedVar, activeVar }, index) => (
          <React.Fragment key={key}>
            {index > 0 && <span className="dna__thread-segment" />}
            <button
              type="button"
              className={`dna__icon-button${activeKey === key ? ' dna__icon-button--active' : ''}`}
              style={{ '--dna-muted': `var(${mutedVar})`, '--dna-active': `var(${activeVar})` } as React.CSSProperties}
              onMouseEnter={() => setActiveKey(key)}
              onMouseLeave={() => setActiveKey((current) => (current === key ? null : current))}
              onFocus={() => setActiveKey(key)}
              onClick={() => handleClick(key)}
              aria-pressed={activeKey === key}
              aria-label={label}
            >
              <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="dna__sentence-wrap">
        <div className={`dna__sentence-box${activeTrait ? ' dna__sentence-box--visible' : ''}`} style={sentenceStyle}>
          <p className="dna__sentence">{activeTrait?.sentence ?? ''}</p>
        </div>
      </div>
    </div>
  );
};

export default DnaPipeline;
