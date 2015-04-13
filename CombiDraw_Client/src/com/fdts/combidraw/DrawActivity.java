package com.fdts.combidraw;

import com.fdts.combidraw.R;
import com.movl.connect.model.IMCUser;
import com.movl.connect.model.MCData;

import android.gesture.Gesture;
import android.gesture.GestureOverlayView;
import android.gesture.GestureOverlayView.OnGestureListener;
import android.gesture.GestureOverlayView.OnGesturePerformedListener;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.Toast;

public class DrawActivity extends MainActivity {

	private Button button_clear;
	private ImageButton button_red;
	private ImageButton button_yellow;
	private ImageButton button_blue;
	private ImageButton button_green;
	private ImageButton button_s1;
	private ImageButton button_s2;
	private ImageButton button_s3;
	private ImageButton button_s4;
	private ImageButton button_erase;
	private String currentColorString = "";
	private int currentSize;

	private GestureOverlayView gesture;

	private OnGestureListener gestureListener;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.draw);

		gesture = (GestureOverlayView) findViewById(R.id.gestures);
		gestureListener = new GestureListener();
		gesture.setGestureStrokeWidth(3);
		gesture.setGestureColor(Color.RED);
		gesture.setUncertainGestureColor(Color.RED);
		gesture.addOnGestureListener(gestureListener);
		gesture.addOnGesturePerformedListener((OnGesturePerformedListener) gestureListener);

		button_clear = (Button) findViewById(R.id.button_clear);
		button_clear.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					MCData data = new MCData();
					data.put("text", "clear");
					app.getClient().sendToHosts("clear", data);
					gesture.cancelClearAnimation();
					gesture.clear(true);
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_red = (ImageButton) findViewById(R.id.button_red);
		button_red.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureColor(Color.RED);
					gesture.setUncertainGestureColor(Color.RED);
					currentColorString = "#FF0000";
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_blue = (ImageButton) findViewById(R.id.button_blue);
		button_blue.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					currentColorString = "#0000FF";
					gesture.setGestureColor(Color.BLUE);
					gesture.setUncertainGestureColor(Color.BLUE);
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_green = (ImageButton) findViewById(R.id.button_green);
		button_green.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureColor(Color.GREEN);
					gesture.setUncertainGestureColor(Color.GREEN);
					currentColorString = "#00FF00";
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_yellow = (ImageButton) findViewById(R.id.button_yellow);
		button_yellow.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureColor(Color.YELLOW);
					gesture.setUncertainGestureColor(Color.YELLOW);
					currentColorString = "#FFFF00";
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_s1 = (ImageButton) findViewById(R.id.button_s1);
		button_s1.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureStrokeWidth(1);
					currentSize = 1;
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_s2 = (ImageButton) findViewById(R.id.button_s2);
		button_s2.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureStrokeWidth(3);
					currentSize = 3;
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_s3 = (ImageButton) findViewById(R.id.button_s3);
		button_s3.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureStrokeWidth(5);
					currentSize = 5;
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_s4 = (ImageButton) findViewById(R.id.button_s4);
		button_s4.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureStrokeWidth(10);
					currentSize = 10;
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		button_erase = (ImageButton) findViewById(R.id.button_erase);
		button_erase.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View arg0) {
				try {
					gesture.cancelClearAnimation();
					gesture.clear(true);
					gesture.setGestureStrokeWidth(10);
					currentSize = 10;
					currentColorString = "#FFFFFF";
					gesture.setGestureColor(Color.WHITE);
					gesture.setUncertainGestureColor(Color.WHITE);
				}
				catch (Exception e) {
					e.printStackTrace();
					Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
				}
			}
		});

	}

	@Override
	public void onMessage(final IMCUser sender, final String messageId, final MCData messageData, final String target) {
		this.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				Log.i(Connect.LOG_TAG, "USER_onMESSAGE" + sender + " messageId:" + messageId + " messageData:"
						+ messageData + " target:" + target);
				/*
				 * if (messageId.equals("activate")) { String message = messageData.getString("text");
				 * text_draw.setText("Zeichne ein(e) " + message + "!"); Toast.makeText(DrawActivity.this, "activate: "
				 * + message, 3000).show(); gesture.cancelClearAnimation(); gesture.clear(true);
				 * gesture.setGestureVisible(true); button_skip.setEnabled(true); button_submit.setEnabled(false);
				 * chat_content.setEnabled(false); active = true; } else if (messageId.equals("deactivate")) {
				 * Toast.makeText(DrawActivity.this, "deactivate:", 3000).show(); text_draw.setText("Rate!");
				 * gesture.cancelClearAnimation(); gesture.clear(true); gesture.setGestureVisible(false);
				 * button_skip.setEnabled(false); button_clear.setEnabled(false); button_submit.setEnabled(true);
				 * chat_content.setEnabled(true); active = false; }
				 */

			}

		});
	}

	class GestureListener implements OnGestureListener, OnGesturePerformedListener  {

		@Override
		public void onGesture(GestureOverlayView overlay, MotionEvent event) {
			try {
				int x = (int) event.getX();
				int y = (int) event.getY();
				MCData data = new MCData();
				data.put("text", x + "x" + y + "y");
				app.getClient().sendToHosts("draw", data);

			}
			catch (Exception e) {
				e.printStackTrace();
				Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
			}

		}

		@Override
		public void onGestureCancelled(GestureOverlayView overlay, MotionEvent event) {
			try {
				MCData data = new MCData();
				data.put("text", "onGestureCancelled!");
				app.getClient().sendToHosts("stop", data);

			}
			catch (Exception e) {
				e.printStackTrace();
				Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
			}
		}

		@Override
		public void onGestureEnded(GestureOverlayView overlay, MotionEvent event) {
			try {
				MCData data = new MCData();
				data.put("text", "end");
				app.getClient().sendToHosts("stop", data);

			}
			catch (Exception e) {
				e.printStackTrace();
				Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
			}

		}

		@Override
		public void onGestureStarted(GestureOverlayView overlay, MotionEvent event) {
			try {
				int x = (int) event.getX();
				int y = (int) event.getY();
				MCData data = new MCData();
				data.put("text", currentColorString+"_"+currentSize+"_" + x + "_" + y + "_");
				app.getClient().sendToHosts("start", data);

			}
			catch (Exception e) {
				e.printStackTrace();
				Toast.makeText(DrawActivity.this, "No draw on the string", Toast.LENGTH_SHORT).show();
			}

		}

		@Override
		public void onGesturePerformed(GestureOverlayView overlay, Gesture gesture) {
						
		}

	}

}
