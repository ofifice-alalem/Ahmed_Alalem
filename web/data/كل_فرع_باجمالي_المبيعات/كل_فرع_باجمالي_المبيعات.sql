SELECT 
    SUB_DEALER,
    SUM(Total_All) AS total_all_sum,
    SUM(Total_Comm) AS total_comm_sum,
    SUM(Total_After_Comm) AS total_after_comm_sum
FROM albadel.summary_by_sub_dealer
GROUP BY SUB_DEALER
ORDER BY total_all_sum DESC;
