import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[
    _type == "startup" && 
    defined(slug.current) && 
    (
      !defined($search) || 
      $search == "" || 
      title match ("*" + lower($search) + "*") || 
      lower(title) match ("*" + lower($search) + "*") ||
      category match ("*" + lower($search) + "*") || 
      lower(category) match ("*" + lower($search) + "*") ||
      author->name match ("*" + lower($search) + "*") ||
      lower(author->name) match ("*" + lower($search) + "*")
    )
  ] | order(_createdAt desc) {
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    }, 
    views,
    description,
    category,
    image,
  }`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  pitch,
}`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
        _id, views
    }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "playlist" && slug.current == "editors-picks"][0] {
    _id,
    title,
    "slug": slug.current,
    "select": select[]-> {
      _id,
      title,
      description,
      category,
      image,
      views,
      _createdAt,
      author-> {
        _id,
        name,
        username,
        image
      }
    }
  }
`);




