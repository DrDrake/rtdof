#define KERNEL_SIZE 9

// Gaussian kernel
// 1 2 1
// 2 4 2
// 1 2 1	
float kernel[KERNEL_SIZE];
float multi;

uniform sampler2D colorMap;
uniform sampler2D depthMap;
uniform float width;
uniform float height;
uniform float depth;

float step_w = width;
float step_h = width;

vec2 offset[KERNEL_SIZE];
						 
void main(void)
{
   int i = 0;
   vec4 sum = vec4(0.0);
   
   offset[0] = vec2(-step_w, -step_h);
   offset[1] = vec2(0.0, -step_h);
   offset[2] = vec2(step_w, -step_h);
   
   offset[3] = vec2(-step_w, 0.0);
   offset[4] = vec2(0.0, 0.0);
   offset[5] = vec2(step_w, 0.0);
   
   offset[6] = vec2(-step_w, step_h);
   offset[7] = vec2(0.0, step_h);
   offset[8] = vec2(step_w, step_h);
   
   kernel[0] = 1.0/16.0; 	kernel[1] = 2.0/16.0;	kernel[2] = 1.0/16.0;
   kernel[3] = 2.0/16.0;	kernel[4] = 4.0/16.0;	kernel[5] = 2.0/16.0;
   kernel[6] = 1.0/16.0;   	kernel[7] = 2.0/16.0;	kernel[8] = 1.0/16.0;
   
   
   if(gl_TexCoord[0].s<0.495)
   {
	   for( i=0; i<KERNEL_SIZE; i++ )
	   {
			vec4 tmp = texture2D(colorMap, gl_TexCoord[0].st + offset[i]);
			sum += tmp * kernel[i];
	   }
   }
   else if( gl_TexCoord[0].s>0.505 )
   {
		sum = texture2D(colorMap, gl_TexCoord[0].xy);
   }
   else
   {
		sum = vec4(1.0, 0.0, 0.0, 1.0);
	}

   gl_FragColor = sum;
}
