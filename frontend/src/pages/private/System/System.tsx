import { useRouter } from "src/hooks/useRouter";

export default function System() {
  const { getRouteTitle } = useRouter();

  return (
    <div>
      <>{getRouteTitle()}</>
    </div>
  );
}
