import React, { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

const Comments = ({ deviceId }) => {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [showReplyField, setShowReplyField] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq('deviceId', deviceId);
        if (error) {
          console.error('Error fetching comments:', error.message);
        } else {
          setComments(data || []);
        }
      } catch (error) {
        console.error('Unexpected error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [deviceId]);

  const handleNewComment = async (e) => {
    e.preventDefault();
  
    if (!author.trim() || !content.trim() || isSubmitting) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const newComment = {
        deviceId,
        author,
        content,
      };
  
      const { data, error } = await supabase.from('comments').insert([newComment]);
  
      if (error) {
        console.error('Error adding comment:', error.message);
      } else {
        if (data && data.length > 0) {
          const insertedComment = data[0];
          setComments([...comments, insertedComment]);
          setPopupVisible(true);
          setAuthor('');
          setContent('');
          setTimeout(() => {
            setPopupVisible(false);
          }, 3000);
        } else {

        }
      }
      
    } catch (error) {
      console.error('Unexpected error adding comment:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  const handleReplyToggle = (commentId) => {
    setShowReplyField(commentId === showReplyField ? null : commentId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl text-green-500 font-semibold mb-4">Comments</h2>

      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 border-green-500 border w-auto rounded p-4 mb-4">
          <p className="text-black font-semibold">{comment.author}</p>
          <p className="text-black">{comment.content}</p>
          <button onClick={() => handleReplyToggle(comment.id)} className="text-sm text-gray-500 underline mt-1">
            Reply
          </button>
          {showReplyField === comment.id && (
            <div className="ml-4">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your Name"
                required
                className="border rounded py-2 px-3 mb-2 text-black w-full"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your Reply"
                required
                className="border rounded py-2 px-3 mb-2 w-full h-32 text-black"
              />
              <button
                type="button"
                onClick={handleNewComment}
                disabled={isSubmitting}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                {isSubmitting ? 'Posting...' : 'Post Reply'}
              </button>
            </div>
          )}
        </div>
      ))}

      {popupVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white py-2 text-center rounded">
          Comment submitted successfully!
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg text-green-500 font-semibold mb-2">Write Your Comment</h3>
        <form onSubmit={handleNewComment}>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your Name"
            required
            className="border rounded py-2 px-3 mb-2 text-black w-full"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your Comment"
            required
            className="border rounded py-2 px-3 mb-2 w-full h-32 text-black"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
