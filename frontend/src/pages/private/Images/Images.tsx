import { useGetImagesQuery } from "src/app/services/imageService";
import { useRouter } from "src/hooks/useRouter";

export default function Images() {
  const { getRouteTitle } = useRouter();
  const { data: images } = useGetImagesQuery();

  return (
    <div>
      {getRouteTitle()}
      {images && images.length > 0
        ? images.map((image) => (
            <div
              key={image.Id}
              style={{
                paddingBlock: "10px",
              }}
            >
              <p>ID: {image.Id}</p>
              <p>Created {image.Created}</p>
            </div>
          ))
        : null}
    </div>
  );
}
