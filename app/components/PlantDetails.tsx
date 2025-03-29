interface PlantDetailsProps {
  name?: string;
  description?: string;
  scientificName?: string;
}

export default function PlantDetails({ 
  name, 
  description, 
  scientificName 
}: PlantDetailsProps) {
  if (!name) return null

  return (
    <div className="card">
      <h2 style={{
        color: 'var(--primary-green)', 
        marginBottom: '10px'
      }}>
        {name}
      </h2>
      
      {scientificName && (
        <p style={{
          color: 'var(--secondary-green)', 
          fontStyle: 'italic'
        }}>
          Scientific Name: {scientificName}
        </p>
      )}
      
      {description && (
        <p>{description}</p>
      )}
    </div>
  )
}