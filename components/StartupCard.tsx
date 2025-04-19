import { formatDate } from '@/lib/utils'
import { EyeIcon} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const StartupCard = ({ post} : {post : StartupTypeCard}) => {

    // Destructuring the post object
    const {
        _createdAt,
        views,
        author,
        title,
        category,
        _id,
        image,
        description,
      } = post;

  return (
    <li className="startup-card group">
    <div className="flex-between">
      <p className="startup_card_date">{formatDate(post._createdAt)}</p>

      <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{post.views}</span>
        </div>

      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
            {/* Particular User's Link */}
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>

          {/* Startup's Link */}
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        {/* User's Profile */}
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt= {author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <Image src={image} alt="placeholder" width={10} height={10} className="startup-card_img" />
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
  )
}

export default StartupCard
