const StringUtils = {
    removeAccents: function (text) {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }
}

export default StringUtils;