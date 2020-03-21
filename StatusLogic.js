IF (
    AND (
        EQUALS (
            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
            ,'Closed'
        )
        ,EQUALS (
            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
            ,'Planning'
        )
        ,EQUALS (
            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
            ,'Closed'
        )
        ,contains (
            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_Tags' ]
            ,'DUPE'
        )
    )
    ,'Abandoned'
    ,IF (
        AND (
            EQUALS (
                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                ,'Closed'
            )
            ,EQUALS (
                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                ,'Approved'
            )
            ,EQUALS (
                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                ,'In Analysis'
            )
        )
        ,'Closed'
        ,IF (
            AND (
                EQUALS (
                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                    ,'Closed'
                )
                ,EQUALS (
                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                    ,'Declined'
                )
            )
            ,'Abandon'
            ,IF (
                AND (
                    EQUALS (
                        body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                        ,'Active'
                    )
                    ,EQUALS (
                        body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                        ,'Approved'
                    )
                    ,EQUALS (
                        body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                        ,'Waiting for Data'
                    )
                )
                ,'Blocked'
                ,IF (
                    AND (
                        EQUALS (
                            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                            ,'Active'
                        )
                        ,EQUALS (
                            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                            ,'Approved'
                        )
                        ,EQUALS (
                            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                            ,'Revenue Impact Analysis'
                        )
                    )
                    ,'10 - Revenue Impact Analysis'
                    ,IF (
                        AND (
                            EQUALS (
                                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                ,'Active'
                            )
                            ,EQUALS (
                                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                ,'Approved'
                            )
                            ,EQUALS (
                                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                                ,'In Analysis'
                            )
                        )
                        ,'09 - In Analysis'
                        ,IF (
                            AND (
                                EQUALS (
                                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                    ,'Active'
                                )
                                ,EQUALS (
                                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                    ,'Approved'
                                )
                                ,EQUALS (
                                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                                    ,'In Flight'
                                )
                            )
                            ,'08 - In Flight'
                            ,IF (
                                AND (
                                    EQUALS (
                                        body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                        ,'Active'
                                    )
                                    ,EQUALS (
                                        body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                        ,'Approved'
                                    )
                                    ,EQUALS (
                                        body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                                        ,'Deployed'
                                    )
                                )
                                ,'07 - Ready to Launch'
                                ,IF (
                                    AND (
                                        EQUALS (
                                            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                            ,'Active'
                                        )
                                        ,EQUALS (
                                            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                            ,'Approved'
                                        )
                                        ,EQUALS (
                                            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                                            ,'Testing'
                                        )
                                    )
                                    ,'06 - QA - Dev and BI QA'
                                    ,IF (
                                        AND (
                                            EQUALS (
                                                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                                ,'Active'
                                            )
                                            ,EQUALS (
                                                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                                ,'Approved'
                                            )
                                            ,EQUALS (
                                                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                                                ,'Coding'
                                            )
                                        )
                                        ,'05 - Coding'
                                        ,IF (
                                            AND (
                                                EQUALS (
                                                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                                    ,'Active'
                                                )
                                                ,EQUALS (
                                                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                                    ,'Approved'
                                                )
                                            )
                                            ,'04 - Ready to Code'
                                            ,IF (
                                                AND (
                                                    EQUALS (
                                                        body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                                        ,'Proposed'
                                                    )
                                                    ,EQUALS (
                                                        body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                                        ,'Approved'
                                                    )
                                                )
                                                ,'02 - Approved'
                                                ,IF (
                                                    AND (
                                                        EQUALS (
                                                            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                                            ,'Proposed'
                                                        )
                                                        ,EQUALS (
                                                            body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                                            ,'Requested'
                                                        )
                                                    )
                                                    ,'01 - Requested'
                                                    ,IF (
                                                        AND (
                                                            EQUALS (
                                                                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                                                ,'Proposed'
                                                            )
                                                            ,EQUALS (
                                                                body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                                                ,'Investigate'
                                                            )
                                                        )
                                                        ,'00 - Investigate'
                                                        ,IF (
                                                            AND (
                                                                EQUALS (
                                                                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'System_State' ]
                                                                    ,'Proposed'
                                                                )
                                                                ,EQUALS (
                                                                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentApproval' ]
                                                                    ,'NULL'
                                                                )
                                                                ,EQUALS (
                                                                    body ('Get_Experiment_Details') ? [ 'fields' ] ? [ 'OSG_ExperimentStatus' ]
                                                                    ,'NULL'
                                                                )
                                                            )
                                                            ,'New'
                                                            ,'New'
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    )
)