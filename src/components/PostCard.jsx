import { useState } from "react";
import { Heart, MessageCircle, Share2, Send, Bookmark, MoreHorizontal, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";





 const PostCard = ({
  post,
  onLike,
  onComment,
  onAcceptRequest,
  onRejectRequest,
  onSave,
}) => {
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText("");
    }
  };

  const displayedComments = showAllComments
    ? post.comments
    : post.comments.slice(0, 2);

  return (
    <article className="bg-card rounded-xl overflow-hidden border border-border shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-glow)] w-full max-w-md mx-auto my-4">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={post.userAvatar} alt={post.username} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
              {post.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{post.username}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>

        {post.isPending && (
          <div className="flex items-center gap-2 ml-2">
            <Button
              size="sm"
              onClick={() => onAcceptRequest(post.id)}
              className="h-8 px-3 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light shadow-sm"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRejectRequest(post.id)}
              className="h-8 px-3 border-border hover:bg-muted"
            >
              <UserMinus className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}

        {/* {!post.isPending && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        )} */}
      </header>

      {/* Image */}
      <div className="relative aspect-square bg-muted">
        <img
          src={post.postImage}
          alt="Post content"
          className="w-full h-full object-cover"
          onDoubleClick={() => onLike(post.id)}
        />
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onLike(post.id)}
              className={cn(
                "h-9 w-9 rounded-full transition-all duration-300",
                post.isLiked
                  ? "text-primary hover:text-primary hover:bg-primary/10"
                  : "text-foreground hover:text-primary hover:bg-muted"
              )}
            >
              <Heart
                className={cn(
                  "h-6 w-6 transition-all",
                  post.isLiked && "fill-primary"
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-foreground hover:text-primary hover:bg-muted"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            {/* <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-foreground hover:text-primary hover:bg-muted"
            >
              <Share2 className="h-6 w-6" />
            </Button> */}
          </div>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => onSave(post.id)}
            className={cn(
              "h-9 w-9 rounded-full transition-all duration-300",
              post.isSaved
                ? "text-primary hover:text-primary hover:bg-primary/10"
                : "text-foreground hover:text-primary hover:bg-muted"
            )}
          >
            <Bookmark
              className={cn(
                "h-6 w-6 transition-all",
                post.isSaved && "fill-primary"
              )}
            />
          </Button> */}
        </div>

        {/* Likes */}
        <p className="font-semibold text-foreground text-sm">
          {post.likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold text-foreground mr-2">{post.username}</span>
          <span className="text-foreground">{post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="space-y-2">
            {post.comments.length > 2 && !showAllComments && (
              <button
                onClick={() => setShowAllComments(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all {post.comments.length} comments
              </button>
            )}

            {displayedComments.map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-semibold text-foreground mr-2">
                  {comment.username}
                </span>
                <span className="text-foreground">{comment.text}</span>
              </div>
            ))}

            {showAllComments && post.comments.length > 2 && (
              <button
                onClick={() => setShowAllComments(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Show less
              </button>
            )}
          </div>
        )}

        {/* Add Comment */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleComment()}
            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
          />
          <Button
            size="sm"
            onClick={handleComment}
            disabled={!commentText.trim()}
            className="h-8 px-3 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
};
export default PostCard;
