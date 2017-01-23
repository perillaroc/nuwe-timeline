
export function mergeConfig(base_config, user_config) {
    let config = Object.assign({}, base_config);

    if(Array.isArray(user_config)) {
        for(let i=0; i< user_config.length; i++ ) {
            config[i] = user_config[i];
        }
    } else if(typeof user_config === 'object') {
        Object.keys(user_config).forEach(function(key, index){
            let value = user_config[key];
            let base_has_property = config.hasOwnProperty(key);
            let base_value = base_has_property ? config[key] : {};

            if(base_has_property
                && typeof base_value === "object"
                && !Array.isArray(base_value)
                && base_value != null
                && !Array.isArray(value)
                && typeof value === 'object'
            ) {
                config[key] = mergeConfig(base_value, value);
            } else {
                config[key] = value;
            }
        });
    }

    return config;
}