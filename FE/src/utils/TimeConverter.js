export default function TimeConverter(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds === 0 ? "00" : remainingSeconds} `;
}
