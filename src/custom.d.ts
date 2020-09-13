// ko có là lỗi import svg
//https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
declare module "*.svg" {
  const content: any
  export default content
}

declare module "*.jpg" {
  const content: any
  export default content
}

declare module "*.jpeg" {
  const content: any
  export default content
}
