import React, { useState } from 'react';
import { 
  ArrowLeft, MessageSquare, Sparkles, Plus, Search, Shield, ThumbsUp, 
  MessageCircle, Share2, Compass, Bookmark, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { ScreenType, CommunityPostItem } from '../types';

interface CommunityScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'for-you' | 'university' | 'city' | 'roommates'>('for-you');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Accommodation');
  const [postContent, setPostContent] = useState('');

  const [posts, setPosts] = useState<CommunityPostItem[]>([
    {
      id: 'post-1',
      author: 'Ananya S.',
      role: 'Verified Resident',
      category: 'Accommodation',
      title: 'Tips for checking electricity sub-meters before signing a PG lease',
      content: 'Always ask the owner for the exact per-unit electricity rate and check whether the sub-meter is dedicated solely to your room or shared across common passages.',
      time: '2 hours ago',
      repliesCount: 14,
      likesCount: 38
    },
    {
      id: 'post-2',
      author: 'Kabir V.',
      role: 'Student Representative',
      category: 'Transport',
      title: 'Best auto-rickshaw and metro commute routes from North Gate',
      content: 'If your morning lecture is at 9 AM, leaving by 8:15 AM via the campus shuttle bypasses the heavy rush-hour congestion on University Avenue.',
      time: 'Yesterday',
      repliesCount: 8,
      likesCount: 22
    },
    {
      id: 'post-3',
      author: 'Neha P.',
      role: 'Verified Student',
      category: 'Roommates',
      title: 'Looking for a flatmate near Campus District (Budget ₹9k)',
      content: 'Hey everyone! I am renting a 2BHK flat near Scholar Haven. Looking for a quiet, studious female flatmate who shares similar academic schedules.',
      time: '2 days ago',
      repliesCount: 19,
      likesCount: 45
    }
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    const newPost: CommunityPostItem = {
      id: `post-${Date.now()}`,
      author: 'You (Student)',
      role: 'Verified Student',
      category: postCategory,
      title: postTitle,
      content: postContent,
      time: 'Just now',
      repliesCount: 0,
      likesCount: 1
    };

    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setNewPostModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 animate-fade-in bg-[#FAF8F5] min-h-screen text-zinc-900">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 text-zinc-700 text-xs font-semibold hover:bg-orange-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Dashboard</span>
        </button>

        <button
          onClick={() => setNewPostModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-1">UniStay Community</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Trusted student discussions, local tips, roommate requests, and accommodation guidance.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-[24px] p-2 border border-orange-100 mb-6 flex items-center gap-3 px-4 shadow-xs">
        <Search className="w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask students anything or search discussions..."
          className="w-full py-2.5 text-xs text-zinc-800 bg-transparent focus:outline-none"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
        {[
          { id: 'for-you', label: '✨ For You' },
          { id: 'university', label: '🎓 My University' },
          { id: 'city', label: '🏙️ City Life' },
          { id: 'roommates', label: '👥 Roommate Requests' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-white text-zinc-700 border-orange-100 hover:bg-orange-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-[28px] border border-orange-100/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-900">{post.author}</span>
                <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  {post.role}
                </span>
              </div>
              <span className="text-[11px] text-zinc-400">{post.time}</span>
            </div>

            <span className="text-[10px] font-bold text-orange-700 bg-orange-100/80 px-2.5 py-1 rounded-lg inline-block mb-2">
              {post.category}
            </span>

            <h3 className="text-base font-bold text-zinc-900 mb-2">{post.title}</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">{post.content}</p>

            <div className="flex items-center gap-6 pt-4 border-t border-zinc-100 text-xs text-zinc-500">
              <button 
                onClick={() => alert("Liked post")}
                className="flex items-center gap-1.5 hover:text-orange-600 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likesCount} Helpful</span>
              </button>
              <button 
                onClick={() => alert("Opening discussion replies")}
                className="flex items-center gap-1.5 hover:text-orange-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.repliesCount} Replies</span>
              </button>
              <button 
                onClick={() => alert("Post saved to saved items")}
                className="flex items-center gap-1.5 hover:text-orange-600 transition-colors ml-auto"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {newPostModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-fade-in border border-orange-100">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Create Community Post</h3>
            <p className="text-xs text-zinc-500 mb-6">Ask questions, share accommodation tips, or discuss university life.</p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Category:</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-orange-200 text-xs font-semibold focus:outline-none"
                >
                  <option value="Accommodation">Accommodation</option>
                  <option value="Transport">Transport</option>
                  <option value="Roommates">Roommates</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Study & Library">Study & Library</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Title:</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Tips for finding verified PGs near North Campus"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-orange-200 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Content:</label>
                <textarea
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write your advice, question, or discussion..."
                  className="w-full p-4 rounded-xl bg-[#FAF8F5] border border-orange-200 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPostModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-zinc-100 text-zinc-700 font-bold text-xs hover:bg-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
