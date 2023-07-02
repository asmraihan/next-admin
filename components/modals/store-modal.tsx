'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

export const StoreModal = () => {
    const storeModal = useStoreModal()

    return (
        <Modal
            title="create store"
            description="create a new store for manage product or category"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future Store form
        </Modal>
    )
}