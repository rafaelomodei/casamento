export interface CommentCardProps {
  avatarUrl: string;
  name: string;
  date: string;
  message: string;
  isOwner?: boolean;
  onEdit?: (message: string) => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
}
