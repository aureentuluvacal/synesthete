extern crate wasm_bindgen;
extern crate serde_json;

use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;
use serde::{Serialize, Deserialize};
use web_sys::{CanvasRenderingContext2d, ImageData};

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug)]
pub struct Colors {
    zero: String,
    one: String,
    two: String,
    three: String,
    four: String,
    five: String,
    six: String,
    seven: String,
    eight: String,
    nine: String,
}

#[wasm_bindgen]
pub fn parse_rgb_string(rgb: &str) {

}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn load_colors(colors_from_js: &JsValue) -> Colors {
    colors_from_js.into_serde().unwrap()
}

#[wasm_bindgen]
pub fn draw(
    ctx: &CanvasRenderingContext2d, 
    width: u32,
    height: u32,
    colors_from_js: &JsValue, 
    input_value: &JsValue
) -> Result<(), JsValue> {
    let colors: Colors = load_colors(colors_from_js);
    let digits: Vec<char> = input_value.as_string().unwrap().chars().collect();
    let mut mapped_color_data = vec![255, width*4];
    let default_color = String::from("#fff");

    for (i, digit) in digits.iter().enumerate() {
        let digit_as_int: u32 = digit.to_digit(10).unwrap();

        let mapped_color = match digit_as_int {
            0 => &colors.zero,
            1 => &colors.one,
            2 => &colors.two, 
            3 => &colors.three,
            4 => &colors.four,
            5 => &colors.five,
            6 => &colors.six,
            7 => &colors.seven,
            8 => &colors.eight,
            9 => &colors.nine,
            _ => &default_color
        };

        let mut split = mapped_color.split(",");
        let color_component_number = 0;
        for s in split {
            mapped_color_data[i+color_component_number] = (s.parse::<u32>().unwrap()) as u8;
            color_component_number += 1;
        }

        mapped_color_data[i+color_component_number] = 255;
    }

    let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut mapped_color_data[..]), width, height)?;
    ctx.put_image_data(&data, 0.0, 0.0)
}
