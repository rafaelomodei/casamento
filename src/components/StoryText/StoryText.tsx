import { STORY_PARAGRAPHS } from '@/lib/story';
import { truncateWithEllipsis } from '@/lib/utlils/text';

interface StoryTextProps {
  maxChars?: number;
}

export default function StoryText({ maxChars }: StoryTextProps) {
  let remaining = typeof maxChars === 'number' ? maxChars : Infinity;
  const paragraphs: JSX.Element[] = [];

  for (const [index, paragraph] of STORY_PARAGRAPHS.entries()) {
    if (remaining <= 0) break;
    if (paragraph.length <= remaining) {
      paragraphs.push(<p key={index}>{paragraph}</p>);
      remaining -= paragraph.length;
    } else {
      paragraphs.push(
        <p key={index}>{truncateWithEllipsis(paragraph, remaining)}</p>
      );
      break;
    }
  }

  return <>{paragraphs}</>;
}
