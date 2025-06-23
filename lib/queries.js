const homeFields = `
  _id,
  title,
  content,
  filters,
  islands,
  "slug": slug.current
`

const aboutFields = `
  _id,
  title,
  content,
  textcolumnone,
  textcolumntwo,
  textcolumnthree,
  "slug": slug.current
`

const contactFields = `
  _id,
  title,
  content,
  textcolumnone,
  textItems,
  "slug": slug.current
`

const projectFields = `
  _id,
  name,
  title,
  content,
  thumbnail,
  tags,
  videoId,
  slices[]{
    _type,
    _key,
    caption,
    asset,
    title,
    label,
    text,
    videoId,
    'audioURL': file.asset->url
  },
  "slug": slug.current
`

const legalFields = `
  _id,
  title,
  content,
  text,
  "slug": slug.current
`

export const homeQuery = `
*[_type == "home"][0] {
  ${homeFields}
}
`

export const previewHomeQuery = `
*[_type == "home"] | order(_updatedAt desc)[0] {
  ${homeFields}
}
`

export const aboutQuery = `
*[_type == "about" && slug.current == $slug][0] {
  ${aboutFields}
}
`

export const previewAboutQuery = `
*[_type == "about" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${aboutFields}
}
`

export const contactQuery = `
*[_type == "contact" && slug.current == $slug][0] {
  ${contactFields}
}
`

export const previewContactQuery = `
*[_type == "contact" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${contactFields}
}
`

export const projectSlugsQuery = `
*[_type == "project" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const projectQuery = `
*[_type == "project" && slug.current == $slug][0] {
  ${projectFields}
}`


export const previewProjectQuery = `
*[_type == "project" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${projectFields}
}`

export const allProjectsQuery = `
*[_type == "project" && defined(slug.current) && !(_id in path('drafts.**'))] {
  ${projectFields}
}`

export const previewAllProjectsQuery = `
*[_type == "project" && defined(slug.current)] | order(_updatedAt desc) {
  ${projectFields}
}`

export const projectByRefQuery = `
*[_type == "project" && _id == $ref][0] {
  ${projectFields}
}`

export const menuQuery = `
*[_type == "menu"][0] {
  menuItems,
  cookietext,
  cookieaccept,
  cookierefuse
}
`

export const footerQuery = `
*[_type == "footer"][0] {
  ticker
}
`

export const legalQuery = `
*[_type == "legal" && slug.current == $slug][0] {
    ${legalFields}
}
`

export const previewLegalQuery = `
*[_type == "legal" && slug.current == $slug] | order(_updatedAt desc)[0] {
    ${legalFields}
}
`

export const allDocumentsSlugsQuery = `
*[slug.current == $slug][0] {
  _type,
  "slug": slug.current
}
`