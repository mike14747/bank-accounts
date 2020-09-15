const formatAccountData = (dataArray) => {
    dataArray.forEach(account => {
        account.transactions.map(item => {
            item.payee = account.payees.find(payee => payee.id === item.payee_id).name;
            return item;
        });
    });
    return dataArray;
};

const findNextPayeeId = (payeesArray) => {
    return Math.max(...payeesArray.map(p => p.id)) + 1;
};

module.exports = {
    formatAccountData,
    findNextPayeeId,
};
