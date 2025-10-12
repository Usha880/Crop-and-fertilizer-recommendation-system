def compute_gaps(crop_ideal, soil_actual):
    return {
        'n': max(crop_ideal['n'] - soil_actual['n'], 0),
        'p': max(crop_ideal['p'] - soil_actual['p'], 0),
        'k': max(crop_ideal['k'] - soil_actual['k'], 0)
    }
