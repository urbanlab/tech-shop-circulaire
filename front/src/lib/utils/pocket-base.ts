import { PUBLIC_POCKETBASE_URL } from "$env/static/public";

export function resolveUrlToImage(collectionId: string, elementId: string, imageName: string) {
    return (
        PUBLIC_POCKETBASE_URL +
        "/api/files/" +
        collectionId +
        "/" +
        elementId +
        "/" +
        imageName
    );
}
