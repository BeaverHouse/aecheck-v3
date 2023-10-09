import Card from '@mui/material/Card'
import React from 'react'
import useCheckStore from '../../store/useCheckStore';
import { useTranslation } from 'react-i18next';
import { getGrastaStep } from '../../util/func';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import CharacterCheck from '../atoms/CharacterCheck';

const ButtonItem = styled(ToggleButton)(({
    flexGrow: 1,
    flexBasis: 0,
    maxHeight: 50
}));

const CharacterGrasta: React.FC<CharacterInfo> = (info) => {

    const { grasta, addGrasta, removeGrasta } = useCheckStore();
    const { t } = useTranslation()

    const stepArr = [0, 1, 2]

    const currentStep = getGrastaStep(info, grasta)

    const changeGrasta = (step: number) => {
        if (step === 0) removeGrasta(info.id)
        else addGrasta(step * 10000 + info.id)
    }

    return (
        <Card sx={{ display: 'flex', overflow: "unset", alignItems: "stretch" }}>
            <Box sx={{ display: 'flex', alignItems: "center" }}>
                <CharacterCheck info={info} isCheck={false} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "column", flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{ mt: 0.3, mb: 0.3 }}>
                    {t(`book.char${info.id}`)}
                </Typography>
                <ToggleButtonGroup
                    color="secondary"
                    value={currentStep}
                    exclusive
                    sx={{ flexGrow: 1 }}
                >
                    {stepArr.map((step) => (<ButtonItem
                        key={step}
                        value={step}
                        onClick={() => changeGrasta(step)}
                    >
                        <img src={`/image/icon/grasta${step}.png`} alt={`${step}`} width={40} />
                    </ButtonItem>))}
                </ToggleButtonGroup>

            </Box>
        </Card >
    )
}

export default CharacterGrasta