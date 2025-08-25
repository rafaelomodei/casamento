'use client';

import StoryText from '@/components/StoryText/StoryText';
import { useIsMobile } from '@/hooks/use-mobile';

export default function StoryPreview() {
  const isMobile = useIsMobile();
  const maxChars = isMobile ? 300 : 600;

  return (
    <div className='flex w-full lg:w-[668px] flex-col gap-4'>
      <StoryText maxChars={maxChars} />
    </div>
  );
}
