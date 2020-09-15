const formatAccountData = (dataArray) => {
    dataArray.forEach(account => {
        account.nextPayeeId = Math.max(...account.payees.map(p => p.id)) + 1;
        account.transactions.map(item => {
            item.payee = account.payees.find(payee => payee.id === item.payee_id).name;
            return item;
        });
    });
    return dataArray;
};

module.exports = {
    formatAccountData,
};
