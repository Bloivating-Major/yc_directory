import { cn, formatDate } from '@/lib/utils'
import { EyeIcon} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Startup, Author } from '@/sanity.types'
import { Skeleton } from './ui/skeleton'

export type StartupTypeCard = {
  _id: string;
  _createdAt: string;
  title?: string | null;
  views?: number | null;
  author?: Author | null;
  category?: string | null;
  image?: string | null;
  description?: string | null;
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  // Destructuring with default values to handle nulls
  const {
    _createdAt,
    views = 0,
    author,
    title = '',
    category = '',
    _id,
    image = '',
    description = '',
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          {author && (
            <Link href={`/user/${author._id}`}>
              <p className="text-16-medium line-clamp-1">{author.name}</p>
            </Link>
          )}

          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        {author && (
          <Link href={`/user/${author._id}`}>
            <Image
              src={author.image || ''}
              alt={author.name || ''}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        )}
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        {image && <img src={image} alt={title || ''} className="startup-card_img" />}
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard
