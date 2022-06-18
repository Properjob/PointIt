export default function classnames(...classname) {
  return classname.filter(Boolean).join(" ");
}
