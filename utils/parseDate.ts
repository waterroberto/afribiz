export default function parseDate(value: number) {
  return `${new Date(value).toLocaleDateString('default', {
    month: 'long',
  })} ${new Date(value).getDate()}, ${new Date(value).getUTCFullYear()}`;
}
