SELECT 
    Recharge_type_LYD,
    SUM(Total_All) AS total_all_sum,
    SUM(Total_Comm) AS total_comm_sum,
    SUM(Total_After_Comm) AS total_after_comm_sum
FROM albadel.summary_by_recharge_type
GROUP BY Recharge_type_LYD
ORDER BY total_all_sum DESC;
