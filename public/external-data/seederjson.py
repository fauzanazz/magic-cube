import random
import json

def generate_seeder_data():
    # Generate a random number for Objective Function and Duration
    objective_function = random.randint(1, 100)  # Random number between 1 and 100
    duration_value = random.randint(1, 100)  # Random number between 1 and 100

    # Function to generate a unique first or last state
    def generate_unique_state():
        positions = list(range(1, 126))  # Positions from 1 to 125
        shuffled_values = random.sample(positions, len(positions))  # Shuffle to ensure uniqueness
        return [[i + 1, shuffled_values[i]] for i in range(len(shuffled_values))]

    # Create the firstState and lastState arrays
    first_state = generate_unique_state()
    last_state = generate_unique_state()

    # Create the final data object with nested duration
    seeder_data = {
        "duration": {
            "objectiveFunction": objective_function,
            "duration": duration_value,
        },
        "firstState": first_state,
        "lastState": last_state,
    }

    return seeder_data

def save_to_json_file(data, filename):
    with open(filename, 'w') as json_file:
        
        json.dump(data, json_file, indent=2)

# Generate and print the seeder data
seeder_data = generate_seeder_data()
save_to_json_file(seeder_data, 'process.json')
print(f"Seeder data saved to 'seeder_data.json':\n{json.dumps(seeder_data, indent=2)}")