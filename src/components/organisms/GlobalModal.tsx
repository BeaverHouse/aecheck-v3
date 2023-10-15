import React from 'react'
import FilterModal from '../molecules/FilterModal'
import CharacterModal from '../atoms/CharacterModal'
import { isCharacterInfo } from '../../util/typecheck'
import DataLoaderModal from '../atoms/DataLoaderModal'

interface GlobalModalState {
    modalInfo: string | CharacterInfo | null
}

const GlobalModal: React.FC<GlobalModalState> = ({ modalInfo }) => {
    if (typeof modalInfo === "string") {
        if (modalInfo === "DATALOADER") return <DataLoaderModal />
        return <FilterModal modalType={modalInfo} />
    } else if (isCharacterInfo(modalInfo)) {
        return <CharacterModal {...modalInfo} />
    } else {
        return null
    }
}

export default GlobalModal