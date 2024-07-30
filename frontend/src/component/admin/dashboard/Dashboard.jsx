import React, { useEffect, useState } from 'react';
import UsageComponent from '../../common/UsageComponent';
import UserChartComponent from '../../common/UserChartComponent';
import { getUserChart } from '../../../service/UserService';
import { getLoanStatistic } from '../../../service/RentService';
import '../../../assets/style/Dashboard.css';
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const [loanStatistic, setLoanStatistic] = useState({});
  const [userChart, setUserChart] = useState({});
  const { isAdmin } = useAuth();
  const [admin, setAdmin] = useState(isAdmin);

  useEffect(() => {
    setAdmin(isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    getLoanStatistic().then(response => {
      setLoanStatistic(response.data);
    });

    getUserChart().then(response => {
      setUserChart(response.data);
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
        <h5>Bảng điều khiển</h5>
      </div>
      <div className="d-flex justify-content-between w-100">
        <UsageComponent loanStatistic={loanStatistic} />
        <UserChartComponent userChart={userChart} />
      </div>
    </div>
  );
};

export default Dashboard;
