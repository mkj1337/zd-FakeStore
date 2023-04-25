// styles
import { useState } from 'react';
import './Faq.scss';

import { FaqContent } from './FaqContent';

interface FaqItemProp {
  title: string;
  content: string;
}

type FaqProps = {
  faqs: FaqItemProp[];
};

export const Faq = ({ faqs }: FaqProps) => {
  const [isActiveFaq, setIsActiveFaq] = useState<number | null>(null);

  return (
    <section className="faq">
      <div className="faq__wrapper">
        <div className="faq__top">
          <h2 className="faq__top-title">FAQ</h2>
        </div>
        <div className="faq__content">
          {faqs.map((faq, index) => (
            <FaqContent
              index={index}
              isActiveFaq={isActiveFaq}
              setIsActiveFaq={setIsActiveFaq}
              title={faq.title}
              content={faq.content}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
