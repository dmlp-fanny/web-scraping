type AdProps = {
  id: string, 
  title: string, 
  img: string, 
  type: string
} 

export default function AdCard ( {title, img} : AdProps) {

  return (
    <div className="ads__card" style={{ backgroundImage: `url(${img})` }}>
      <div className="ads__title">{title}</div>
    </div>
  );
}
