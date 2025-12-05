extern crate console_error_panic_hook;
extern crate serde_json;
extern crate wasm_bindgen;

use serde::{Deserialize, Serialize};
use std::panic;
use wasm_bindgen::Clamped;
use wasm_bindgen::prelude::*;
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
pub fn load_colors(colors_from_js: &JsValue) -> Colors {
    serde_wasm_bindgen::from_value(colors_from_js.clone()).unwrap_or_else(
        |_| {
            // Fallback if deserialization fails
            Colors {
                zero: "0,0,0".to_string(),
                one: "255,0,0".to_string(),
                two: "0,255,0".to_string(),
                three: "0,0,255".to_string(),
                four: "255,255,0".to_string(),
                five: "255,0,255".to_string(),
                six: "0,255,255".to_string(),
                seven: "128,128,128".to_string(),
                eight: "255,128,0".to_string(),
                nine: "128,0,255".to_string(),
            }
        },
    )
}

#[wasm_bindgen]
pub fn draw(
    ctx: &CanvasRenderingContext2d,
    width: u32,
    height: u32,
    colors_from_js: &JsValue,
    input_value: &JsValue,
) -> Result<(), JsValue> {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
    let colors: Colors = load_colors(colors_from_js);
    let digits: Vec<char> = input_value
        .as_string()
        .unwrap_or_default()
        .chars()
        .collect();

    if digits.is_empty() {
        return Ok(());
    }

    let mut mapped_color_data = vec![0; (4 * height * width) as usize];
    let default_color = String::from("255,255,255");
    let total_pixels = (width * height) as usize;

    for pixel_index in 0..total_pixels {
        let digit_index = pixel_index % digits.len();
        let digit = digits[digit_index];
        let digit_as_int: u32 = digit.to_digit(10).unwrap_or(0);

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
            _ => &default_color,
        };

        let byte_index = pixel_index * 4;
        let rgb_parts: Vec<&str> = mapped_color.split(",").collect();
        if rgb_parts.len() >= 3 {
            mapped_color_data[byte_index] =
                rgb_parts[0].parse::<u8>().unwrap_or(255);
            mapped_color_data[byte_index + 1] =
                rgb_parts[1].parse::<u8>().unwrap_or(255);
            mapped_color_data[byte_index + 2] =
                rgb_parts[2].parse::<u8>().unwrap_or(255);
            mapped_color_data[byte_index + 3] = 255; // Alpha channel
        }
    }

    let data = ImageData::new_with_u8_clamped_array_and_sh(
        Clamped(&mut mapped_color_data),
        width,
        height,
    )?;
    ctx.put_image_data(&data, 0.0, 0.0)
}
