import React from 'react'
import FilterModal from '../molecules/FilterModal'
import CharacterModal from '../atoms/CharacterModal'
import { isCharacterInfo } from '../../util/typecheck'

interface GlobalModalState {
    modalInfo: string | CharacterInfo | null
}

const GlobalModal: React.FC<GlobalModalState> = ({ modalInfo }) => {
    if (typeof modalInfo === "string") {
        return <FilterModal modalType={modalInfo} />
    } else if (isCharacterInfo(modalInfo)) {
        return <CharacterModal {...modalInfo} />
    } else {
        return null
    }
}

export default GlobalModal