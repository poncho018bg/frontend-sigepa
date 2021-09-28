import React from 'react'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Wizard from 'components/Wizard/Wizard';
import Step1 from './WizardSteps/Step1';
import Step2 from './WizardSteps/Step2';
import Step3 from './WizardSteps/Step3';




export const RegistroProgramasApoyoScreen = () => {
    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={12}>
                <Wizard
                validate
                steps={[
                    { stepName: "CURP", stepComponent: Step1, stepId: "about" },
                    { stepName: "Datos del Solicitante", stepComponent: Step2, stepId: "account" },
                    { stepName: "Address", stepComponent: Step3, stepId: "address" },
                ]}
                title="Registro de solicitud a Programas de Apoyo"
                subtitle="Favor de enviar la información solicitada"
                finishButtonClick={(e) => console.log(e)}
                />
            </GridItem>
        </GridContainer>
    )
}
