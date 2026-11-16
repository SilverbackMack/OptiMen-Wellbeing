import React from 'react';
import { TextPiece } from '../links';

export type OpenContent = (target: { articleId?: string; reviewId?: string }) => void;

interface LinkedTextProps {
  pieces: TextPiece[];
  onOpen: OpenContent;
}

/** Text with in-site links. Links change the page in place, without a reload. */
export const LinkedText: React.FC<LinkedTextProps> = ({ pieces, onOpen }) => (
  <>
    {pieces.map((piece, idx) =>
      typeof piece === 'string' ? (
        <React.Fragment key={idx}>{piece}</React.Fragment>
      ) : (
        <a
          key={idx}
          href={piece.href}
          onClick={(e) => {
            e.preventDefault();
            onOpen({ articleId: piece.articleId, reviewId: piece.reviewId });
          }}
          className="font-semibold text-[#166534] underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800"
        >
          {piece.text}
        </a>
      ),
    )}
  </>
);
