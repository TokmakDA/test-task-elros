export interface Image {
  id: string | number
  image: string
  thumbnail: string
  created: string
  modified: string
  title: string | null
}

export interface ImageForm {
  title: string
  image: File | File[] | undefined
}
