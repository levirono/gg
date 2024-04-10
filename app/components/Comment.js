import React, { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

const Comments = ({ deviceId }) => {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [replyToId, setReplyToId] = useState(null); // State to track which comment to reply to

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

    if (!author.trim() || !content.trim()) {
      alert('Please enter your name and comment content.');
      return;
    }

    try {
      const newComment = {
        deviceId,
        author,
        content,
        replyToId: replyToId || null, // Use replyToId if replying, otherwise set to null
      };

      const { data, error } = await supabase.from('comments').insert([newComment]);

      if (error) {
        console.error('Error adding comment:', error.message);
      } else {
        setComments([...comments, ...data]);
        setPopupVisible(true);
        setAuthor('');
        setContent('');
        setReplyToId(null); // Reset replyToId after successful comment

        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Unexpected error adding comment:', error.message);
    }
  };

  const handleReply = (commentId) => {
    setReplyToId(commentId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl text-green-500 font-semibold mb-4">Comments</h2>

      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 border-green-500 border w-auto rounded p-4 mb-4">
          <p className="text-black font-semibold">{comment.author}</p>
          <p className="text-black">{comment.content}</p>
          <button onClick={() => handleReply(comment.id)} className="text-sm text-gray-500 underline mt-1">
            Reply
          </button>
          {/* Render replies with indentation */}
          {comment.replyToId === replyToId && (
            <div className="ml-4">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your Name"
                required
                className="border rounded py-2 px-3 mb-2 text-black"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="content"
                placeholder="Your Reply"
                required
                className="border rounded py-2 px-3 mb-2 w-full h-32 text-black"
              />
              <button
                type="button"
                onClick={handleNewComment}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Post Reply
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
        <h3 className="text-lg text-green-500 font-semibold mb-2 w-1/3">Write Your Comment</h3>
        <form onSubmit={handleNewComment}>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your Name"
            required
            className="border rounded py-2 px-3 mb-2 text-black"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="content"
            placeholder="Your Comment"
            required
            className="border rounded py-2 px-3 mb-2 w-full h-32 text-black"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
