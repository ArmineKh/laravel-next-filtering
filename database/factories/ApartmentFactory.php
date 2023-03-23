<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Apartment;


class ApartmentFactory extends Factory
{

    protected $model = Apartment::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'bedrooms' => $this->faker->numberBetween(1,20),
            'bathrooms' => $this->faker->numberBetween(1,10),
            'storeys' => $this->faker->text,
            'garages' => $this->faker->numberBetween(1,10),
            'price' => $this->faker->numberBetween(1000,100000),

        ];
    }
}



