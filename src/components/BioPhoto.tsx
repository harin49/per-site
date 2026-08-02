'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const SLOT_COUNT = 5;

const SLOT_IMAGES: Array<string | null> = ['/images/pp.png', '/images/pp-2.png', '/images/pp-3.jpeg', null, null];

const BioPhoto = () => {
  const [visibleSlot, setVisibleSlot] = useState<number | null>(null);

  useEffect(() => {
    setVisibleSlot(Math.floor(Math.random() * SLOT_COUNT));
  }, []);

  return (
    <div className="bio__photo-row">
      {SLOT_IMAGES.map((src, slot) => (
        <div
          key={slot}
          className={`bio__photo-wrap${slot === visibleSlot ? ' bio__photo-wrap--visible' : ''}`}
          onMouseEnter={() => setVisibleSlot(slot)}
        >
          {src ? (
            <Image src={src} alt="Harinarayanan" width={190} height={190} className="bio__photo" priority />
          ) : (
            <div className="bio__photo bio__photo--placeholder" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BioPhoto;
