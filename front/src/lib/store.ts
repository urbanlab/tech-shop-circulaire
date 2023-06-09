import { get, writable } from 'svelte/store';
export const modal = writable(false);
export const loginModal = writable(false);
import PocketBase from 'pocketbase';
import {PUBLIC_POCKETBASE_URL} from '$env/static/public'

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
    currentUser.set(pb.authStore.model);
});


export async function watchUserChange() {
    const getUser = await pb.collection("users").getOne(get(currentUser).id, {});
    currentUser.set(getUser);
    // subscribe to the user data
    pb.collection("users").subscribe('*', async ({action,  record}) => {
        if (action === "update") {
            currentUser.set(record);
        }
    });
}

export type Equipment = {
    id: string;
    name: string;
    desc: string;
    reference: string;
    date: Date;
    tips: string;
    /**
     * Image name
     */
    image: string;
    purchaseCost: number;
    type: any;
    field: any[];
}

export const currentEquipments = writable<Equipment[]>([]);

export async function watchEquipmentsChange() {
    const getEquipments = await pb.collection("equipments").getFullList<Equipment>();
    currentEquipments.set(getEquipments);
    // subscribe to the user data
    pb.collection("equipments").subscribe('*', async ({action,  record}) => {
        if (action === "update") {
            currentEquipments.set(get(currentEquipments).map(equipment => {
                if (equipment.id === record.id) {
                    return record;
                }
                return equipment;
            }
            ));
        }
        if (action === "create") {
            currentEquipments.set([...get(currentEquipments), record]);
        }
        if (action === "delete") {
            currentEquipments.set(get(currentEquipments).filter(equipment => equipment.id !== record.id));
        }

    });
}
