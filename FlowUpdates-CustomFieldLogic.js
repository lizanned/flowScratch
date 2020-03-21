// General TEMPLATE to check for pre-existing values before overwriting - 
// Some took custom logic to work edgecases
if(
equals(
    variables('DSMSExisting'),
    'False'
    ),
'DEFAULTVALUE',
if(
    or(
        equals(
            XBOXNAME,
            ''
            ),
        empty(
            XBOXNAME
            )
        ),
    if(empty(DSMSNAME),'DEFAULTVALUE',DSMSNAME),XBOXNAME
   
    )
)
//Custom_TestType OSG_TestType
if(
    or(
        equals(
            body('Get_Experiment_Details')?['fields']?['OSG_TestType'],''
            ),
        empty(
            body('Get_Experiment_Details')?['fields']?['OSG_TestType']
            )
        ),
    'Optimize',
    body('Get_Experiment_Details')?['fields']?['OSG_RevenueImpact']
    )
//Custom_TestStrategy OSG_TestStrategy
if(
    or(
        equals(
            body('Get_Experiment_Details')?['fields']?['OSG_TestStrategy'],''
            ),
        empty(
            body('Get_Experiment_Details')?['fields']?['OSG_TestStrategy']
            )
        ),
    'Increase Motivation',body('Get_Experiment_Details')?['fields']?['OSG_TestStrategy']
    )
//Platform or Channel
if(
    not(
        empty(
          body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_PlatformorChannel']
          )
        ),
    body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_PlatformorChannel'],
    if(
        equals(
            body('Get_Experiment_Details')?['fields']?['OSG_ProductFamily'],'Xbox'
            ),
        'SFA Xbox',
        if(
            or(
                equals(
                    body('Get_Experiment_Details')?['fields']?['OSG_ProductFamily'],'Windows'
                    ),
                contains(
                    body('Get_Experiment_Details')?['fields']?['System_Tags'], 'Win10')
                ),
            'SFA Windows',
            'SFA All'
            )
        )
      )
//Custom.RevenueImpact - DONE
if(
    and(
        or(
            equals(
                body('Get_Experiment_Details')?['fields']?['OSG_RevenueImpact'],''
                ),
            empty(
                body('Get_Experiment_Details')?['fields']?['OSG_RevenueImpact']
                )
            ),
        not(
            equals(
                variables('CalculatedDSMSState'),'Closed'
                )
            )
        ),
    body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_RevenueImpact'],
    if(
        empty(
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_RevenueImpact']
            ),
        '0',
        body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_RevenueImpact']
        )
    )
//Custom.PrimaryKPI - DONE
if(
    equals(
        variables('DSMSExisting'),
        'False'
        ),
    'Revenue Per Visitor',
    if(
        or(
            equals(
                body('Get_Experiment_Details')?['fields']?['OSG_PrimaryKPISuccessCriteria'],''
                ),
            empty(
                body('Get_Experiment_Details')?['fields']?['OSG_PrimaryKPISuccessCriteria']
                )
            ),
        if(
            empty(
                body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_PrimaryKPI']
                ),
            'Revenue Per Visitor',
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_PrimaryKPI']
            ),
        body('Get_Experiment_Details')?['fields']?['OSG_PrimaryKPISuccessCriteria']
    )
 )
//Custom.ExperimentMarkets - DONE
if(
    equals(
        variables('DSMSExisting'),'False'
        ),
    'EN-US',
    if(
        or(
            equals(
                body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentMarkets'],''
                ),
            empty(
                body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentMarkets']
                )
            ),
        'EN-US',
        body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentMarkets']
        )
    )
//Custom.NumberofTreatmentsincludingControl - DONE
if(
    equals(
        variables('DSMSExisting'),'False'
        ),
    '2 (Control + 1)',
    if(
        empty(
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_NumberofTreatmentsincludingControl']
            ),
        '2 (Control + 1)',
        body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_NumberofTreatmentsincludingControl']
        )
    )
//Custom.ExperimentOutcome - DONE
if(
    equals(
        variables('CalculatedDSMSState'),
        'Closed'
        ),
    if(
        equals(
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome'], variables('Outcome')
            ),
        variables('Outcome'),
        if(
            empty(
                body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome']
                ),
            variables('Outcome'),
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome']
            )
        ),
    if(
        equals(
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome'], 
            variables('Outcome')
            ),
        variables('Outcome'),
        if(
            and(
                empty(
                    body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome']
                    ),
                empty(
                    variables('Outcome')
                    )
                ),
            '',
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome']
            )
        )
    )
//Custom.PrimaryKPIResult - DONE
if(
    equals(
        variables('CalculatedDSMSState'),
        'Closed'
        ),
    if(
        equals(
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome'], 
            variables('CalcPrimaryKPIResult')
            ),
        variables('CalcPrimaryKPIResult'),
        if(
            and(
                empty(
                    body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome']
                    ),
                equals(
                    variables('CalcPrimaryKPIResult'),'Unknown'
                    )
                ),
            variables('CalcPrimaryKPIResult'),
            if(
                equals(
                    variables('CalcPrimaryKPIResult'),
                    'Unknown'
                    ),
                body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome'],
                variables('CalcPrimaryKPIResult')
                )
            )
        ),
    if(
        equals(
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome'], 
            variables('CalcPrimaryKPIResult')
            ),
        variables('CalcPrimaryKPIResult'),
        if(
            and(
                empty(
                    body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome']
                    ),
                equals(
                    variables('CalcPrimaryKPIResult'),'Unknown')
                ),
            '',
            if(
                equals(
                    variables('CalcPrimaryKPIResult'),
                    'Unknown'
                    ),
                body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ExperimentOutcome'],
                ''
                )
            )
        )
    )
//Custom.ResultsSummary - DONE
if(
    Not(
        equals(
            variables('CalculatedDSMSState'),
            'Closed'
            )
        ),
    '',
    if(
        or(
            equals(
                body('Get_Experiment_Details')?['fields']?['OSG_ExperimentAnalysis'],
                ''
                ),
            empty(
                body('Get_Experiment_Details')?['fields']?['OSG_ExperimentAnalysis']
                )
            ),
        if(
            empty(
                body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ResultsSummary']
                ),
            'TBD',
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_ResultsSummary']
            ),
        body('Get_Experiment_Details')?['fields']?['OSG_ExperimentAnalysis'])
    )
//Custom.GuardrailMetrics - DONE
if(
    equals(
        variables('DSMSExisting'),
        'False'
        ),
    'Revenue',
    if(
        or(
            equals(
                body('Get_Experiment_Details')?['fields']?['OSG_GuardrailMetrics'],
                ''
                ),
            empty(
                body('Get_Experiment_Details')?['fields']?['OSG_GuardrailMetrics']
                )
            ),
        if(
            empty(
                body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_GuardrailMetrics']
                ),
            'Revenue',
            body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_GuardrailMetrics']
        ),
        body('Get_Experiment_Details')?['fields']?['OSG_GuardrailMetrics']
    )
 )
//Custom.AdobeWorkspaceorxCardLink DONE
if(
    empty(
        body('Get_DSMS_Work_Item_Details')?['fields']?['Custom_AdobeWorkspaceorxCardLink']
        ),
    if(
        equals(
            variables('CalculatedDSMSState'),
            'Closed'
            ),
        'Please Update',
        ''
     ),
    ''
 )



