import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaInstagram } from "react-icons/fa";

interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

const InstagramFeed = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fetch Instagram feed from our API
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/instagram/feed'],
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const instagramPosts: InstagramPost[] = data?.feed || [];

  return (
    <section id="instagram-feed" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <m.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('instagram.title')}</h2>
          <p className="text-lg text-neutral">{t('instagram.subtitle')}</p>
        </m.div>

        {/* Instagram Feed Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg aspect-square bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{t('instagram.error')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <InstagramPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button variant="outline" className="inline-flex items-center gap-2" asChild>
            <a 
              href="https://instagram.com/SmartXOfficial" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {t('instagram.followButton')}
              <FaInstagram className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface InstagramPostCardProps {
  post: InstagramPost;
  index: number;
}

const InstagramPostCard = ({ post, index }: InstagramPostCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      className="relative overflow-hidden rounded-lg aspect-square"
    >
      <img 
        src={`${post.imageUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`} 
        alt="Instagram Post" 
        className="w-full h-full object-cover transition duration-500 hover:scale-110" 
      />
      <div className="absolute inset-0 bg-dark/0 hover:bg-dark/40 transition duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
        <div className="text-white flex space-x-4">
          <span className="flex items-center">
            <Heart className="h-5 w-5 mr-1" />
            <span>{post.likes}</span>
          </span>
          <span className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>{post.comments}</span>
          </span>
        </div>
      </div>
    </m.div>
  );
};

export default InstagramFeed;